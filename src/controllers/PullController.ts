// controllers/PushController.ts
import { IpcMainInvokeEvent } from "electron";
import { IController } from "interfaces/IController";
import { git } from "../models/Git";
import { log } from "../models/Log";

export const PullController: IController = {
  // TODO
  prefix: "git",

  functions: {
    async pull(_: IpcMainInvokeEvent) {
      try {
        let response = await git.pull();
        response = JSON.parse(JSON.stringify(response));
        log.append("COMMAND", `Succesfully Pulled`);

        return true;
      } catch (error: any) {
        log.append("ERROR", error);
        return false;
      }
    },
  },
};
