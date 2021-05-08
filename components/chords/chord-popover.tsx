import Icon from '@chakra-ui/icon'
import {
  IconButton,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'

const InfoIcon = () => <Icon as={BsInfoCircle} />

type ChordPopoverProps = {
  chord: any
}

export const ChordPopover: React.FC<ChordPopoverProps> = ({ chord }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          flex={1}
          variant='solid'
          aria-label={`Information for chord ${chord.name}`}
          icon={<InfoIcon />}
          colorScheme='teal'
        />
      </PopoverTrigger>
      <PopoverContent ml='1' mr='2'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight='bold'>{chord.name}</PopoverHeader>
        <PopoverBody>
          <UnorderedList styleType='none' ml='0'>
            <ListItem>
              <Text fontWeight='bold' display='inline'>
                Notes:{' '}
              </Text>{' '}
              {chord.notes.join(' - ')}
            </ListItem>
            <ListItem>
              <Text fontWeight='bold' display='inline'>
                Aliases:
              </Text>{' '}
              {chord.aliases.filter((a) => !!a).join(' - ')}
            </ListItem>
          </UnorderedList>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
