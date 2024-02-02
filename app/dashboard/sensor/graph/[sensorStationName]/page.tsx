const SensorGraph = ({ params }: { params: { sensorStationName: string } }) => {
  let sensorStationName = params.sensorStationName.replaceAll("%2F", "/");
  sensorStationName = sensorStationName.substring(
    sensorStationName.indexOf("/") + 1
  );

  return (
    <iframe
      src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?theme=light&orgId=1&from=${
        new Date().getTime() - 1000 * 60 * 60 * 6
      }&to=${new Date().getTime()}&panelId=38&var-station=${sensorStationName}`}
      width="100%"
      className="aspect-video"
    ></iframe>
  );
};

export default SensorGraph;
