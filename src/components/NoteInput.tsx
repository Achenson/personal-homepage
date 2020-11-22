import React from 'react'

interface Props {
  noteInput: string | null;
}

function NoteInput({noteInput}: Props): JSX.Element{
    return (
        <div className="bg-gray-100 p-3">
          <div className="bg-yellow-300 p-2 rounded-md">
          {noteInput}

          </div>
        </div>
    )
}

export default NoteInput;