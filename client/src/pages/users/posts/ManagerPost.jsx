import { Section } from "@/components/layouts";
import CardPrototypes from "@/components/Propetyes/CardPrototypes";

import React from "react";

const ManagerPost = () => {
  return (
    <div className="mx-12 h-full  my-4">
      <Section title="Quản lí tin đăng của bạn">
        <CardPrototypes
          setLayout={true}
          limit={import.meta.env.VITE_LIMIT_OF_USER}
        />
      </Section>
    </div>
  );
};

export default ManagerPost;
