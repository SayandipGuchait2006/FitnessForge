function envUrl(key: string, fallback: string) {
  const v = process.env[key]?.trim()
  if (v && v.startsWith('http')) return v
  return fallback
}

export const siteSocial = {
  instagram: envUrl('NEXT_PUBLIC_SOCIAL_INSTAGRAM', 'https://www.instagram.com/'),
  twitter: envUrl('NEXT_PUBLIC_SOCIAL_TWITTER', 'https://twitter.com/'),
  linkedin: envUrl('NEXT_PUBLIC_SOCIAL_LINKEDIN', 'https://www.linkedin.com/'),
  youtube: envUrl('NEXT_PUBLIC_SOCIAL_YOUTUBE', 'https://www.youtube.com/'),
  facebook: envUrl('NEXT_PUBLIC_SOCIAL_FACEBOOK', 'https://www.facebook.com/'),
}
