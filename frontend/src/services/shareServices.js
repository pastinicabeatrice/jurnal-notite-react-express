const shareService = {
  shareViaEmail: async (entry) => {
    const subject = encodeURIComponent(`jurnal: ${entry.title}`)
    const body = encodeURIComponent(
      `${entry.title}\n\n${entry.content}\n\ncreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  },

  copyToClipboard: async (entry) => {
    const textToCopy = `${entry.title}\n\n${entry.content}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      return true
    } catch (error) {
      console.error('error copying to clipboard:', error)
      return false
    }
  },

  generateShareLink: async (entryId, token) => {
    try {
      const response = await fetch(`http://localhost:5000/api/journal/${entryId}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('failed to generate share link')
      }

      const data = await response.json()
      return data.shareUrl
    } catch (error) {
      console.error('error generating share link:', error)
      throw error
    }
  },

  exportAsText: (entry) => {
    const content = `${entry.title}\n\n${entry.content}\n\ncreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}`
    const blob = new Blob([content], { type: 'text/plain' })
    return blob
  }
}

export default shareService
