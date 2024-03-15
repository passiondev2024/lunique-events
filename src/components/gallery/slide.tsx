type CarouselSlideProps = {
  idx: number;
  url: string;
  isInView: boolean;
};

const PLACEHOLDER_URL = "/images/placeholder.jpg" as const;

export const CarouselSlide = ({ idx, url, isInView }: CarouselSlideProps) => (
  <div
    style={{
      flex: "0 0 100%",
    }}
    className="h-fill relative"
    key={idx}
  >
    <div className="flex size-full items-center justify-center">
      <div className="relative h-[500px] w-full lg:h-[800px] 2xl:h-[700px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isInView ? url : PLACEHOLDER_URL}
          alt=""
          className="size-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);
