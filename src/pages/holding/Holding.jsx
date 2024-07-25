import React from "react";
import { useResizable } from "react-resizable-layout";
import Chart from "../../components/Holding/Chart";
import WatchList from "../../components/Holding/WatchList";
import { HoldingProvider } from "../../store/context/HoldingProvider";

import "react-perfect-scrollbar/dist/css/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://apiv3-2dywgqiasq-uk.a.run.app/graphql/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMDEwMDk2LCJpYXQiOjE3MjE5MjcyOTYsImp0aSI6ImNjMDdjN2JiNTE0NDQ3MDFhZjBiZWZmZWQyOTgwOGNhIiwidXNlcl9pZCI6NzJ9.YXaUsLhZR3I2dgsOqzPcagWeJNGTK_zNqdVOuqiqWAg",
  },
  cache: new InMemoryCache(),
});

function Holding() {
  const navRef = React.useRef(null);
  const [bodyHeight, setBodyHeight] = React.useState(0);
  const { position, separatorProps } = useResizable({
    axis: "x",
    initial: 1500,
    min: 850,
    max: 1600,
  });

  //calculate the height of the screen - nav
  React.useEffect(() => {
    const handleResize = () => {
      const navHeight = navRef.current.offsetHeight;
      const screenHeight = window.innerHeight;
      const newHeight = screenHeight - navHeight - 5;
      setBodyHeight(newHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ApolloProvider client={client}>
      <HoldingProvider>
        <div
          className="flex bg-gray-200 flex-col w-screen h-screen gap-[5px] overflow-hidden select-none"
          style={{
            fontFamily:
              "-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif",
          }}
        >
          <nav
            className="bg-white px-4 py-2 w-full flex items-start justify-between"
            ref={navRef}
          >
            <span>Nav</span>
            <div>
              <a
                href="/strategies"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
              >
                Check Strategies
              </a>
            </div>
          </nav>
          <div className="flex h-full w-full">
            <div
              className="shrink-0 flex flex-col w-full h-full max-h-screen"
              style={{
                width: position,
              }}
            >
              <Chart bodyHeight={bodyHeight} />
            </div>
            <div
              {...separatorProps}
              className="w-[5px] shrink-0 basis-[5px] grow-0 cursor-col-resize hover:bg-gray-300 transition-colors"
              style={{ borderRadius: 5 }}
            />
            <div className="h-full w-full max-h-screen">
              <WatchList bodyHeight={bodyHeight} />
            </div>
          </div>
        </div>
      </HoldingProvider>
    </ApolloProvider>
  );
}

export default Holding;
