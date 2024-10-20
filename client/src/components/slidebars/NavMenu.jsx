import { Fragment, useEffect, useState } from "react";
import menu from "../headers/menu";
import { ConditionRendering } from "../layouts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { pathnames } from "@/lib/pathname";
const NavMenu = () => {
  const [useMenu, setUseMenu] = useState(menu);
  const [activeTabs, setActiveTabs] = useState([]);
  const location = useLocation();
  const handleClickTab = (idtab) => {
    const activeTab = activeTabs.some((el) => el === idtab);
    if (activeTab) {
      setActiveTabs((prev) => prev.filter((el) => el !== idtab));
    } else {
      setActiveTabs((prev) => [...prev, idtab]);
    }
  };
  useEffect(() => {
    const activeSub = menu.find((el) =>
      el.subs?.some((item) => item.path === location.pathname)
    );
    if (activeSub) {
      setActiveTabs((prev) => [
        ...prev.filter((el) => el !== activeSub.id),
        activeSub.id,
      ]);
    }
  }, [location.pathname]);
  return (
    <div>
      {menu?.map((el) => (
        <Fragment key={el.id}>
          {el.hasSub}
          <ConditionRendering show={el.hasSub}>
            <Collapsible open={activeTabs.some((id) => id === el.id)}>
              <CollapsibleTrigger
                onClick={() => {
                  handleClickTab(el.id);
                }}
                className="flex items-center justify-between px-4 py-2 w-full "
              >
                <p
                  className={cn(
                    "flex items-center gap-2",
                    activeTabs.some((e) => e === el.id) && "text-blue-400" // Sửa chỗ này
                  )}
                >
                  {el.icons}
                  {el.label}
                </p>
                {activeTabs.some((activeId) => activeId === el.id) ? (
                  <ChevronRight size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {el.subs?.map((sub) => (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-2 flex items-center gap-2 hover:bg-slate-200",
                        isActive && "bg-slate-200"
                      )
                    }
                    key={sub.id}
                    to={sub.path}
                  >
                    {sub.icons} {sub.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </ConditionRendering>
          <ConditionRendering show={!el.hasSub}>
            <NavLink
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 flex items-center gap-2 hover:bg-slate-200",
                  isActive && "bg-slate-200"
                )
              }
              to={el.path}
            >
              {el.icons} {el.label}
            </NavLink>
          </ConditionRendering>
        </Fragment>
      ))}
    </div>
  );
};

export default NavMenu;
