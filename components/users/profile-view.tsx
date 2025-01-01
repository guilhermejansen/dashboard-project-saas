"use client"

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api/client'
import { UserProfile } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LoadingSkeleton } from '@/components/loading-skeleton'

interface ProfileViewProps {
  userId: string
}

export function ProfileView({ userId }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await apiClient.get<UserProfile>(`/api/v1/users/${userId}/profile`)
        setProfile(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  if (loading) {
    return <LoadingSkeleton type="form" count={3} />
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading profile: {error}
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} alt={profile.fullName} />
            <AvatarFallback>{profile.fullName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{profile.fullName}</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium">Location</h4>
            <p className="text-sm text-muted-foreground">{profile.location}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Bio</h4>
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Social Links</h4>
            <div className="mt-2 space-x-4">
              {Object.entries(profile.socialLinks).map(([platform, username]) => (
                <a
                  key={platform}
                  href={`https://${platform}.com/${username}`}
                  className="text-sm text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
