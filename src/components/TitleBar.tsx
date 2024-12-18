import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Plus, X } from "lucide-react";

function TitleBar() {

  const appWindow = getCurrentWindow();

  return (
    
    <>
      <div data-tauri-drag-region className="title-bar">
        <span className="title-bar-button minimize" onClick={() => appWindow.minimize()}>
          <Minus />
        </span>
        <span className="title-bar-button maximize" onClick={() => appWindow.maximize()}>
          <Plus />
        </span>
        <span className="title-bar-button close" onClick={() => appWindow.close()}>
          <X />
        </span>
      </div>
    </>
  );
}

export default TitleBar;
