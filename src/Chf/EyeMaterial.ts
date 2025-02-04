import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import type { DyeColors } from './DyeColors'
import { readDyeColors, writeDyeColors } from './DyeColors'

export interface EyeMaterial {
  colors: DyeColors
}

export function readEyeMaterial(reader: BufferReader): EyeMaterial {
  reader.expectUint32(0xA047885E)
  reader.expectEmptyGuid()
  reader.expectUint32(0xCE9DF055)
  reader.expectEmptyGuid()
  reader.expectUint32(1)
  reader.expectUint32(5)
  reader.expectUint32(0x9736C44B)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  const colors = readDyeColors(reader)
  reader.expectUint32(5)

  return { colors }
}

export function writeEyeMaterial(writer: BufferWriter, eyeMaterial: EyeMaterial) {
  writer.writeUint32(0xA047885E)
  writer.writeEmptyGuid()
  writer.writeUint32(0xCE9DF055)
  writer.writeEmptyGuid()
  writer.writeUint32(1)
  writer.writeUint32(5)
  writer.writeUint32(0x9736C44B)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writeDyeColors(writer, eyeMaterial.colors)
  writer.writeUint32(5)
}
