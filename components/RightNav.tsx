function RightNav() {
  return (
    <section className="bg-dark flex-col w-full col-span-2 xl:col-span-3 hidden lg:flex p-1">
      <div className="flex flex-col flex-1 text-gray-100 p-3 xl:px-7">
        <h2 className="text-lg font-medium">
          <span className="hidden xl:inline-flex">Suggested</span> Communities
        </h2>
      </div>

      <div className="flex flex-col flex-1 text-gray-100 p-3 xl:px-7">
        <h2 className="text-lg font-medium">
          Suggested Users
        </h2>
      </div>
    </section>
  );
}

export default RightNav;
