import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/features/landing/Section";
import React from "react";

const Stats = ({ requests }: any) => {
  let isActive = requests.filter(
    (elem: { status: string }) => elem.status === "PENDING"
  ).length;
  let presentRequests = requests
    .map(
      (x: { createdAt: { getMonth: () => any } }) =>
        x.createdAt.getMonth() === new Date().getMonth()
    )
    .filter((e: boolean) => e === true).length;

  let oldRequests = requests
    .map(
      (x: { createdAt: { getMonth: () => any } }) =>
        x.createdAt.getMonth() === new Date().getMonth() - 1
    )
    .filter((e: boolean) => e === true).length;

  const result = Math.round((oldRequests / presentRequests) * 100);
  return (
    <Section className=" h-full">
      <div className="flex justify-between flex-wrap flex-col md:flex-row w-full gap-5 ">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Balance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-noir"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-secondary font-extrabold">0€</div>
            <p className="text-xs text-noir font-medium">+0% from last month</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">New creatives</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-noir"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-secondary font-extrabold">+0</div>
            <p className="text-xs text-noir font-medium">+0% from last month</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Requests</CardTitle>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-noir"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M20 8L16.0811 12.1827C15.9326 12.3412 15.8584 12.4204 15.7688 12.4614C15.6897 12.4976 15.6026 12.5125 15.516 12.5047C15.4179 12.4958 15.3215 12.4458 15.1287 12.3457L11.8713 10.6543C11.6785 10.5542 11.5821 10.5042 11.484 10.4953C11.3974 10.4875 11.3103 10.5024 11.2312 10.5386C11.1416 10.5796 11.0674 10.6588 10.9189 10.8173L7 15"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-secondary font-extrabold">
              +{requests.length}
            </div>
            <p className="text-xs text-noir font-medium">
              +{result}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Activity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-noir"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            {isActive ? (
              <>
                <div className="text-3xl text-green-500 font-extrabold">
                  Active
                </div>
                <p className="text-xs text-noir font-medium">
                  You have request
                  {isActive > 1 && "(s)"} in pending
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl text-red-500 font-extrabold">
                  Inactive
                </div>
                <p className="text-xs text-noir font-medium">
                  You don't have request(s) in pending
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Stats;
