import { LogModel } from "../../model/log.model";
import { LogRepository } from "../../repositories/log.repository";
import handler from "./handler";

jest.mock("../../repositories/log.repository");

const getProps = (data: any) => {
  const logRepository = new LogRepository();
  (logRepository.getLogs as jest.Mock).mockReturnValue(data);

  return { logRepository };
};

it("should return empty array when there are 0 logs", async () => {
  const props = getProps([]);
  const res = await handler(props);

  expect(res).toStrictEqual([]);
});

it("should return logs", async () => {
  const data = [
    {
      env: "Dev",
      id: "1",
      logData: "message",
      severity: "Debug",
      source: "Doggo",
      timestamp: Date.now(),
    },
    {
      env: "Acc",
      id: "2",
      logData: "message2",
      severity: "Debug",
      source: "Doggo",
      timestamp: Date.now(),
    },
  ] as LogModel[];
  const props = getProps(data);
  const res = await handler(props);

  expect(res).toStrictEqual(data);
});
