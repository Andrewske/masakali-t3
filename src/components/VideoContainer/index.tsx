const VideoContainer = ({
  title,
  text,
  videoId,
}: {
  title: string;
  text: string;
  videoId: string;
}) => {
  return (
    <div className="w-full bg-gray relative flex flex-col md:grid md:grid-col-5 py-16 md:px-16">
      <div className="md:absolute md:top-1/2 md:left-1/3 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-purple py-16 px-8 flex flex-col align-center gap-8 text-white">
        <h2 className="text-center md:max-w-[350px] ">{title}</h2>
        <p className="text-center text-xs text-white m-auto h-auto w-full md:max-w-[350px] font-baskerville leading-5">
          {text}
        </p>
      </div>
      <iframe
        height={480}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        className="md:col-start-3 md:col-end-4 w-full h-[480px] md:w-[853px]"
        loading="lazy"
      />
    </div>
  );
};

export default VideoContainer;
