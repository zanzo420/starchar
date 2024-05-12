import { Affix, Button, Center, Group, Stack } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useCallback } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { useCharacterStore } from '../useCharacterStore'
import SkinColorPicker from './SkinColorPicker'
import { DnaPanel } from './DnaPanel'

function CharacterEditor() {
  const [isDev] = useLocalStorage({
    key: 'isDev',
    defaultValue: false,
  })
  const getChf = useCharacterStore(state => state.getChf)
  const exportCharacter = useCallback(() => {
    const buffer = getChf()
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'character.chf'
    a.click()
  }, [getChf])

  return (
    <>
      <Stack justify="flex-start">
        <Group justify="space-evenly">
          <SkinColorPicker />
          {isDev && <DnaPanel />}
        </Group>
      </Stack>
      <Affix zIndex={900} position={{ bottom: 0, left: 0, right: 0 }}>
        <Center p="xl">
          <Button
            size="xl"
            rightSection={<IconDownload size={14} />}
            onClick={exportCharacter}
          >
            Export
          </Button>
        </Center>
      </Affix>
    </>
  )
}
export default CharacterEditor
