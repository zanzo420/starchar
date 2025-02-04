import { useEffect, useState } from 'react'
import { ActionIcon, AppShell, Button, Center, FileButton, FileInput, Group, SimpleGrid, Stack, Title, em, useMantineColorScheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconBrandGithub, IconBrandPaypal, IconMoon, IconSun } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import { useShallow } from 'zustand/react/shallow'
import CharacterEditor from './Components/CharacterEditor.tsx'
import { extractChf } from './Chf/ChfFile.ts'
import { useCharacterStore } from './useCharacterStore.ts'
import { readCharacter } from './Chf/Character.ts'
import { DropzoneChf } from './Components/DropzoneChf.tsx'

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [chf, setChf] = useState<File | null>()
  const { isCharacterLoaded, loadCharacter, resetCharacter } = useCharacterStore(
    useShallow(state => ({
      isCharacterLoaded: state.isCharacterLoaded,
      loadCharacter: state.loadCharacter,
      resetCharacter: state.resetCharacter,
    })),
  )
  const isMobile = useMediaQuery(`(max-width: ${em(850)})`)

  const extract = (file: File | null) => {
    if (!file)
      return

    file.arrayBuffer().then((buffer) => {
      const extracted = extractChf(new Uint8Array(buffer))
      const blob = new Blob([extracted], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `extracted.bin`
      a.click()
      URL.revokeObjectURL(url)
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    if (!chf) {
      resetCharacter()
      return
    }

    chf.arrayBuffer().then((buffer) => {
      try {
        const newCharacter = readCharacter(
          extractChf(new Uint8Array(buffer)),
        )
        loadCharacter(newCharacter)
      }
      catch (e) {
        resetCharacter()
        setChf(null)
        notifications.show({
          title: 'Failed to read character',
          message: 'Please upload a valid .chf file',
          color: 'red',
          autoClose: 5000,
        })
        console.error('Failed to read character', e)
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [chf, setChf, resetCharacter, loadCharacter])

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SimpleGrid cols={3} m="sm">
          <Group>
            {isMobile
              ? (
                <>
                  <ActionIcon
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/diogotr7/starchar"
                    variant="subtle"
                  >
                    <IconBrandGithub size={32} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://paypal.me/diogotr7"
                    variant="subtle"
                  >
                    <IconBrandPaypal size={32} />
                  </ActionIcon>
                  <ActionIcon onClick={toggleColorScheme} variant="subtle">
                    {colorScheme === 'dark'
                      ? (
                        <IconSun size={32} />
                        )
                      : (
                        <IconMoon size={32} />
                        )}
                  </ActionIcon>
                </>
                )
              : (
                <>
                  <Button
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/diogotr7/starchar"
                    variant="outline"
                    rightSection={<IconBrandGithub size={18} />}
                  >
                    Source Code
                  </Button>
                  <Button
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://paypal.me/diogotr7"
                    variant="outline"
                    rightSection={<IconBrandPaypal size={18} />}
                  >
                    Donate
                  </Button>
                  <ActionIcon
                    size="lg"
                    onClick={toggleColorScheme}
                    variant="outline"
                  >
                    {colorScheme === 'dark'
                      ? (
                        <IconSun size={18} />
                        )
                      : (
                        <IconMoon size={18} />
                        )}
                  </ActionIcon>
                </>
                )}
          </Group>
          <Center>
            <Title order={2}>StarChar</Title>
          </Center>
          <Group justify="space-evenly">
            <FileButton onChange={extract} accept=".chf">
              {props => <Button variant="outline" {...props}>Extract Chf</Button>}
            </FileButton>
            <FileInput
              ml="auto"
              w={isMobile ? '100%' : 'auto'}
              clearable
              accept=".chf"
              placeholder="Upload Chf"
              value={chf}
              onChange={setChf}
            />
          </Group>
        </SimpleGrid>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="md" justify="center">
          {isCharacterLoaded && chf
            ? <CharacterEditor />
            : <DropzoneChf onDrop={setChf} />}
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
