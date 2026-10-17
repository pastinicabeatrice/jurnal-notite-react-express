import React, { useState } from 'react'

function NotesPage() {
    const [noteId, setNoteId] = useState('')
    const [language, setLanguage] = useState('')
    const [translation, setTranslation] = useState(null)

    const handleTranslate = async () => {
        try {
            const response = await fetch(`http://localhost:3010/notes/${noteId}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetLanguage: language })
            })

            if (response.ok) {
                const data = await response.json()
                setTranslation(data)
            } else {
                console.error('eroare la traducere.')
            }
        } catch (error) {
            console.error('eroare la server:', error)
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">gestionare note</h1> {/* titlu pagina */}
            <p className="text-center">aici vei putea adăuga, șterge și edita notele.</p> {/* descriere pagina */}

            <div className="card p-4 mb-4">
                <h3 className="card-title">tradu nota</h3>
                <div className="form-group">
                    <label htmlFor="noteId">id-ul notei:</label>
                    <input
                        id="noteId"
                        className="form-control"
                        type="text"
                        placeholder="introdu id-ul notei"
                        value={noteId}
                        onChange={(e) => setNoteId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">limbă țintă (ex: en, fr):</label>
                    <input
                        id="language"
                        className="form-control"
                        type="text"
                        placeholder="introdu limba țintă"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleTranslate}>
                    tradu
                </button>
            </div>

            {translation && (
                <div className="card p-4">
                    <h4 className="card-title">rezultatul traducerii:</h4>
                    <p><b>original:</b> {translation.original}</p>
                    <p><b>tradus:</b> {translation.translated}</p>
                    <p><b>limbă:</b> {translation.language}</p>
                </div>
            )}
        </div>
    )
}

export default NotesPage
