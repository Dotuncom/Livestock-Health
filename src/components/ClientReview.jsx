import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import ClientReviewCard from "../cards/ClientReviewCard";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";

const ClientReview = () => {
  return (
    <div className='mt-[4rem] bg-[#EFEEEE] h-auto px-[43px] not-first-of-type: flex flex-col justify-center md:px-[106px] py-[2rem] mb-[5rem] md:h-[672px]'>
      <h1 className='poppins font-semibold text-2xl leading-[90px] text-center md:text-[40px] md:mt-[53px]'>
        Clients Review
      </h1>

      <div className='mt-4 relative'>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          <SwiperSlide>
            <ClientReviewCard
              text="Pigs can hide sickness easily, but Qiwo Farm doesn’t miss a thing. It warned me about a fever early on and helped me stop it before it spread through my piggery. Worth every penny!"
              profile={profile1}
              name="Sandra James"
              location="Kaduna State"
              ratings={5}
            />
          </SwiperSlide>

          <SwiperSlide>
            <ClientReviewCard
              text="I caught a fever in one of my cows early enough to save her. The app alerted me before she even showed visible signs. This device has saved me a lot of money and heartache."
              profile={profile2}
              name="Mr Pam Cattles"
              location="Plateau State"
              ratings={5}
            />
          </SwiperSlide>

          <SwiperSlide>
            <ClientReviewCard
              text="Animals like cows are very stressful to care for but with Qiwo I don’t need to stress myself in taking care of them. Qiwo got me covered."
              profile={profile2}
              name="Sandra James"
              location="Kaduna State"
              ratings={5}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Pagination outside the swiper for mobile */}
      <div className='mt-6'>
        <div className='custom-pagination flex justify-center md:mt-4'></div>
      </div>
    </div>
  );
};

export default ClientReview;
