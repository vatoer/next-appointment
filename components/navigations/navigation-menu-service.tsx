import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";

const NavigationMenuService = () => {
  const services: Array<string> = [];
  const categories: Array<string> = [];
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent hover:underline">
          Dokumen
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {services.map((service) => (
              <>ini list</>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );
};
