"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  const t = useTranslations()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("analytics.overview")}
        </h2>
      </div>
      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">{t("analytics.monthly")}</TabsTrigger>
          <TabsTrigger value="weekly">{t("analytics.weekly")}</TabsTrigger>
          <TabsTrigger value="daily">{t("analytics.daily")}</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("analytics.metrics.totalUsers")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,482</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("analytics.metrics.activeUsers")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,147</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("analytics.metrics.revenue")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("analytics.metrics.engagement")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+180.1%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
