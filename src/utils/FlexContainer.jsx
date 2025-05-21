function FlexContainer({ children }) {
  const xml = (
    <div  id='device'className="flex min-h-[58.6rem] bg-[#EFEEEE] mt-[10.4rem] max-lg:mt-[3.2rem] max-lg:flex-col-reverse">
      {children}
    </div>
  );
  return xml;
}

export default FlexContainer;
