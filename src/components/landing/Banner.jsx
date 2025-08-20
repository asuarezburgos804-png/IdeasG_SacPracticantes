"use client";
import { Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
export default function Banner() {
  const banners = [
    "https://ideasg.org/wp-content/uploads/2020/07/Banner1.png",
    "https://ideasg.org/wp-content/uploads/2020/07/b2.jpg",
  ];

  return (
    <section
      id="banner"
      className="w-full  bg-gray-300 flex items-center justify-center text-xl font-bold"
    >
      <div className="container mx-auto p-4 ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Habilitar módulos
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full "
        >
          {banners.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center bg-gray-300 text-xl font-bold"
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
