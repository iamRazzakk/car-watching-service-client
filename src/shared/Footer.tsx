import Button from "./Button/Button";

const Footer = () => {
  const handleButtonClick = (buttonType: string) => {
    console.log(`${buttonType} button clicked`);
  };
  return (
    <>
      <footer className="mt-20 xl:mt-32 mx-auto w-full relative text-center bg-[#517DE9] text-white">
        <div className="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12 space-y-4">
          <h2 className="font-bold text-3xl xl:text-4xl leading-snug">
            Ready to get your productivity back?
            <br />
            Start your free trial today.
          </h2>
          <Button text="Get Started" type="secondary" onClick={() => handleButtonClick("Secondary")} />
          <div className="mt-14 xl:mt-20">
            <nav className="flex flex-wrap justify-center text-lg font-medium">
              <div className="px-5 py-2">
                <a href="">Contact</a>
              </div>
              <div className="px-5 py-2">
                <a href="">Pricing</a>
              </div>
              <div className="px-5 py-2">
                <a href="">Privacy</a>
              </div>
              <div className="px-5 py-2">
                <a href="">Terms</a>
              </div>
              <div className="px-5 py-2">
                <a href="">Twitter</a>
              </div>
            </nav>
            <p className="mt-7 text-base">© 2023 Car wash, RZAK</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
