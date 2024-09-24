"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Label, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartConfig = {
    views: {
        label: "Patients",
    },
    patients: {
        label: "patients",
        color: "hsl(var(--chart-1))",
    },

} satisfies ChartConfig

interface PatientData {
    date: string;
    patients: number;
}

export function Chart({ patient }: { patient: PatientData[] }) {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("patients")

    const total = React.useMemo(() => ({
        patients: patient.reduce((acc, curr) => acc + curr.patients, 0),
    }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Bar Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total patients for the last {new Date().toUTCString()}
                    </CardDescription>
                </div>
                <div className="flex">
                    {["patients"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px]"
                >
                    <BarChart
                        width={730}
                        height={250}
                        accessibilityLayer
                        data={patient}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <YAxis label={{ value: ' Highest Pateints in month', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />

                        <CartesianGrid vertical={true} />
                        <XAxis height={30}
                            dataKey="_id"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={12}
                            minTickGap={12}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                    //   day: "numeric",
                                })
                            }}

                        >

                        </XAxis>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="patients"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            //   day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={2}>
                            <LabelList
                                position="insideTop"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />

                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
