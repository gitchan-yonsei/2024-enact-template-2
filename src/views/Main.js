import Alert from "@enact/sandstone/Alert";
import BodyText from "@enact/sandstone/BodyText";
import Button from "@enact/sandstone/Button";
import ProgressBar from "@enact/sandstone/ProgressBar";
import { Header, Panel } from "@enact/sandstone/Panels";
import { usePopup } from "./MainState";
import css from "./Main.module.less";
import $L from "@enact/i18n/$L";
import { useProcStat } from "../hooks/useData";
import { nem } from "../libs/services";

const Main = (props) => {
  const procStat = useProcStat();
  const { isPopupOpen, handlePopupOpen, handlePopupClose, handleLaunchApp } =
    usePopup();

  let request = nem({
    method: "getStatus",
    parameters: { subscribe: true },
    onSuccess: function (inResponse) {
      if (typeof inResponse.subscribed != "undefined") {
        if (!inResponse.subscribed) {
          console.log("Failed to subscribe network state");
          return;
        }
      }

      console.log("Result: " + JSON.stringify(inResponse));
      // To-Do something
    },
    onFailure: function (inError) {
      console.log("Failed to get network state");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      // To-Do something
      return;
    },
  });

  return (
    <Panel {...props}>
      <ProgressBar></ProgressBar>
    </Panel>
  );
};
//   return (
//     <Panel {...props}>
//       <Header title={$L("Enact Template")} />
//       <BodyText>{$L("This is a main page of sample application.")}</BodyText>
//       <Button onClick={handlePopupOpen} size="small" className={css.buttonCell}>
//         {$L("Open Alert")}
//       </Button>
//       <BodyText>{`procStat : ${JSON.stringify(procStat)}`}</BodyText>
//       <Alert type="overlay" open={isPopupOpen} onClose={handlePopupClose}>
//         <span>{$L("This is an alert message.")}</span>
//         <buttons>
//           <Button
//             size="small"
//             className={css.buttonCell}
//             onClick={handleLaunchApp}
//           >
//             Launch
//           </Button>
//           <Button
//             size="small"
//             className={css.buttonCell}
//             onClick={handlePopupClose}
//           >
//             {$L("Close")}
//           </Button>
//         </buttons>
//       </Alert>
//     </Panel>
//   );

export default Main;
