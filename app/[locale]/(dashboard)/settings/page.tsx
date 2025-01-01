"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ModeToggle } from "@/components/mode-toggle"

export default function SettingsPage() {
  const t = useTranslations()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("settings.title")}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.theme.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.notifications.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Switch id="email-notifications" />
              <Label htmlFor="email-notifications">
                {t("settings.notifications.email")}
              </Label>
            </div>
            <div className="flex items-center space-x-4">
              <Switch id="push-notifications" />
              <Label htmlFor="push-notifications">
                {t("settings.notifications.push")}
              </Label>
            </div>
            <div className="flex items-center space-x-4">
              <Switch id="product-updates" />
              <Label htmlFor="product-updates">
                {t("settings.notifications.updates")}
              </Label>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.security.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Switch id="2fa" />
              <Label htmlFor="2fa">{t("settings.security.2fa")}</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
