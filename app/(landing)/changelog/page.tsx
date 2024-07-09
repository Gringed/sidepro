import { Separator } from "@/components/ui/separator";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Section } from "@/features/landing/Section";
import React from "react";

const page = () => {
  return (
    <>
      <LandingHeader />
      <div className="flex flex-col w-full h-full ">
        <Section className="flex flex-col items-start text-medium text-justify  h-full py-10  w-full">
          <div className="w-full">
            <div className="mb-5 flex gap-3 flex-col">
              <h1 className="text-2xl font-bold">
                June 2024 - Fix problems and crop feature
              </h1>
              <Separator />
            </div>
            <div>
              <p>
                We're Introducing a crop image feature. Custom size of your
                images for dekstop and mobile.
              </p>
            </div>
            <div className="my-4 w-1/2">
              <video
                className="h-full w-full object-cover object-left"
                loop
                autoPlay={true}
                muted
              >
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528802/Sidepro/iartw8ocgsopd5cckhsv.mp4"
                  type="video/webm"
                />
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528802/Sidepro/iartw8ocgsopd5cckhsv.mp4"
                  type="video/mp4"
                />
                Download the
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528802/Sidepro/iartw8ocgsopd5cckhsv.mp4">
                  WEBM
                </a>
                or
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528802/Sidepro/iartw8ocgsopd5cckhsv.mp4">
                  MP4
                </a>
                video.
              </video>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-5 flex gap-3 flex-col">
              <h1 className="text-2xl font-bold">
                May 2024 - Many features was evolved and introducing mobile
                device
              </h1>
              <Separator />
            </div>
            <div>
              <p>
                We're Introducing a mobile device to build and view the
                rendering on the phone.
              </p>
            </div>
            <div className="my-4">
              <video
                className="h-full w-full object-cover object-left"
                loop
                autoPlay={true}
                muted
              >
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528453/Sidepro/dpcbmpjihanjj6oscbaz.mp4"
                  type="video/webm"
                />
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528453/Sidepro/dpcbmpjihanjj6oscbaz.mp4"
                  type="video/mp4"
                />
                Download the
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528453/Sidepro/dpcbmpjihanjj6oscbaz.mp4">
                  WEBM
                </a>
                or
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528453/Sidepro/dpcbmpjihanjj6oscbaz.mp4">
                  MP4
                </a>
                video.
              </video>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-5 flex gap-3 flex-col">
              <h1 className="text-2xl font-bold">
                April 2024 - Introducing sidepro.me
              </h1>
              <Separator />
            </div>
            <div>
              <p>
                We're Introducing sidepro.me, a simple way to build a porfolio
                or anything that shows you off.
              </p>
            </div>
            <div className="my-4">
              <video
                className="h-full w-full object-cover object-left"
                loop
                autoPlay={true}
                muted
              >
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4"
                  type="video/webm"
                />
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4"
                  type="video/mp4"
                />
                Download the
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4">
                  WEBM
                </a>
                or
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4">
                  MP4
                </a>
                video.
              </video>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-5 flex gap-3 flex-col">
              <h1 className="text-2xl font-bold">
                April 2024 - Introducing sidepro.me
              </h1>
              <Separator />
            </div>
            <div>
              <p>
                We're Introducing sidepro.me, a simple way to build a porfolio
                or anything that shows you off.
              </p>
            </div>
            <div className="my-4">
              <video
                className="h-full w-full object-cover object-left"
                loop
                autoPlay={true}
                muted
              >
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4"
                  type="video/webm"
                />
                <source
                  src="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4"
                  type="video/mp4"
                />
                Download the
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4">
                  WEBM
                </a>
                or
                <a href="http://res.cloudinary.com/dhgoagdvr/video/upload/v1720528146/Sidepro/owirvtdhanhofoq9eelu.mp4">
                  MP4
                </a>
                video.
              </video>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default page;
