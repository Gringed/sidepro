import { Section } from "./Section";

export const HeroSection = () => {
  return (
    <>
      <Section className="lg:py-16 py-8">
        <div className="flex justify-center flex-col gap-10">
          <div className="flex flex-col gap-1">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl text-noir">
              Create,
            </h1>
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl text-secondary">
              together,
            </h1>
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl text-tertiary">
              effortlessly.
            </h1>
          </div>
          <p className="max-w-lg mb-6 text-justify font-medium text-noir lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400">
            Elevate your creativity with our platform, connecting content
            creators and artists seamlessly. Join a vibrant community where
            collaboration sparks innovation.
          </p>
          <div className="flex justify-between max-w-lg">
            <div className="flex flex-col gap-2">
              <h1 className="max-w-2xl  font-black tracking-tight leading-none md:text-2xl xl:text-4xl text-primary">
                50M+
              </h1>
              <p className="font-semibold">Content creators</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="max-w-2xl  font-black tracking-tight leading-none md:text-2xl xl:text-4xl text-tertiary">
                10M+
              </h1>
              <p className="font-semibold">Creatives</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://res.cloudinary.com/dhgoagdvr/image/upload/v1715854900/Linkers/kyaecuz4xvwn3ofp9qnr.png"
            alt="mockup"
          />
        </div>
      </Section>
    </>
  );
};
