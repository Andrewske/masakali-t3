const VideoContainer = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="w-full  bg-gray relative flex flex-col py-16 justify-center items-center">
      {/* <iframe
        height={480}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        className="md:col-start-3 md:col-end-4 w-full h-[480px] md:w-[853px]"
        loading="lazy"
      /> */}
      <span className="max-w-[853px]">
        <video
          src={`https://67rl3g15b4.ufs.sh/f/9ccX0s0IirBPwOTQHRNlUNVbzyqtrjLYJn451su2aHSAxioQ`}
          width={853}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          className="shadow-lg w-full h-[480px] m"
          controls={true}
        />
        <div className=" bg-purple py-16 px-8 flex flex-col align-center gap-8 text-white w-full">
          <h2 className="text-center ">{title}</h2>
          <p className="text-center text-sm text-white m-auto h-auto w-full  font-baskerville leading-5">
            {text}
          </p>
        </div>
      </span>
    </div>
  );
};

export default VideoContainer;
