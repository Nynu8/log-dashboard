import { LogRepository } from "../../repositories/log.repository";
import handler from "./handler";

jest.mock("../../repositories/log.repository");

const getProps = (data: any) => {
  const logRepository = new LogRepository();
  (logRepository.insertLogs as jest.Mock).mockImplementation((data) => data);

  return { logRepository, data };
};

it("should not do anything if input is empty", async () => {
  const props = getProps([]);

  expect(() => {
    handler(props);
  }).not.toThrowError();
});

it("should correctly save the inputted data", async () => {
  const data = [
    { a: 1, b: 2 },
    { c: 3, d: 4 },
  ];

  const props = getProps(data);
  await handler(props);

  expect(props.logRepository.insertLogs).toBeCalledWith(data);
});
