import React from 'react'

interface Props {
  noteInput: string | null;
}

function NoteInput({noteInput}: Props): JSX.Element{
    return (
        <div>
          {noteInput}
        </div>
    )
}

export default NoteInput;