import webpush from "web-push";

import { NodeRedAuthHeaders } from "@/types/general";

type NotificationSendRequest = {
  title: string;
  body: string;
  icon: string;
  data: {
    url: string;
  };
};

type NotificationGet = {
  id: string;
  user_id: string;
  subscription: webpush.PushSubscription;
  created_at: string;
  station_name: string;
};

const POST = async (req: Request) => {
  const data: {
    stationName: string;
  } = await req.json();

  if (!data.stationName) {
    return new Response(
      JSON.stringify({ message: "Station name is required." }),
      { status: 400 }
    );
  }

  webpush.setVapidDetails(
    encodeURI("https://example.com"),
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const notificationToSend: NotificationSendRequest = {
    title: "Sensor Alert",
    body: `This is a test notification for ${
      data.stationName
    } ${new Date().toLocaleString()}`,

    icon: "https://some-image-url.jpg",
    data: {
      url: encodeURI(
        `${process.env.NEXT_PUBLIC_APP_URL}/station/${data.stationName
          // replace all / by 2F
          .replace(/\//g, "%2F")}`
      ),
    },
  };

  // Get all subscriptions from database
  const dbEntries = (await fetch(
    `${process.env.NEXT_PUBLIC_NODE_RED_API}/push?station_name=${data.stationName}`,

    { headers: NodeRedAuthHeaders }
  ).then((res) => res.json())) as NotificationGet[];

  const subscriptions = dbEntries.map((entry) => entry.subscription);

  const results = await Promise.all(
    subscriptions.map((subscription) =>
      webpush.sendNotification(subscription, JSON.stringify(notificationToSend))
    )
  ).catch((err) => {
    console.error("Error sending notification");
    console.error(err);
    return err;
  });

  console.log("Notification sent successfully.");
  console.log(results);

  return new Response(
    JSON.stringify({ message: "Notification sent successfully." })
  );

  // Send notification to all users
};

export { POST };
