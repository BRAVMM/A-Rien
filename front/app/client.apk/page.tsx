'use client'

import { redirect } from 'next/navigation'

export default function DownloadApk() {
    if (!process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL) {
        console.error('NEXT_PUBLIC_APK_DOWNLOAD_URL is not set')
        return null
    }
    redirect(process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL)
}
