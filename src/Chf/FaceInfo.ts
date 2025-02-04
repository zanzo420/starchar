import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'

export interface FaceInfo {
  freckleAmount: number
  freckleOpacity: number
  sunSpotsAmount: number
  sunSpotOpacity: number
  eyeMetallic1: number
  eyeMetallic2: number
  eyeMetallic3: number
  eyeSmoothness1: number
  eyeSmoothness2: number
  eyeSmoothness3: number
  eyeOpacity: number
  cheekMetallic1: number
  cheekMetallic2: number
  cheekMetallic3: number
  cheekSmoothness1: number
  cheekSmoothness2: number
  cheekSmoothness3: number
  cheekOpacity: number
  lipMetallic1: number
  lipMetallic2: number
  lipMetallic3: number
  lipSmoothness1: number
  lipSmoothness2: number
  lipSmoothness3: number
  lipOpacity: number
}
export function readFaceInfo(reader: BufferReader): FaceInfo {
  reader.expectUint32(0x19)
  reader.expectUint32(0)
  return {
    freckleAmount: reader.readKeyedFloat32(0xE87727E2),
    freckleOpacity: reader.readKeyedFloat32(0x9361CB58),
    sunSpotsAmount: reader.readKeyedFloat32(0x554AD20F),
    sunSpotOpacity: reader.readKeyedFloat32(0xCFC41264),
    eyeMetallic1: reader.readKeyedFloat32(0xB95883B0),
    eyeMetallic2: reader.readKeyedFloat32(0x9CF750C3),
    eyeMetallic3: reader.readKeyedFloat32(0xA90644DF),
    eyeSmoothness1: reader.readKeyedFloat32(0xC871A987),
    eyeSmoothness2: reader.readKeyedFloat32(0xEDDE7AF4),
    eyeSmoothness3: reader.readKeyedFloat32(0xD82F6EE8),
    eyeOpacity: reader.readKeyedFloat32(0xCAE526BA),
    cheekMetallic1: reader.readKeyedFloat32(0x0526ED02),
    cheekMetallic2: reader.readKeyedFloat32(0x20893E71),
    cheekMetallic3: reader.readKeyedFloat32(0x15782A6D),
    cheekSmoothness1: reader.readKeyedFloat32(0x9BE3D5D7),
    cheekSmoothness2: reader.readKeyedFloat32(0xBE4C06A4),
    cheekSmoothness3: reader.readKeyedFloat32(0x8BBD12B8),
    cheekOpacity: reader.readKeyedFloat32(0x11A1A1D3),
    lipMetallic1: reader.readKeyedFloat32(0x92571AC3),
    lipMetallic2: reader.readKeyedFloat32(0xB7F8C9B0),
    lipMetallic3: reader.readKeyedFloat32(0x8209DDAC),
    lipSmoothness1: reader.readKeyedFloat32(0xAA9201E7),
    lipSmoothness2: reader.readKeyedFloat32(0x8F3DD294),
    lipSmoothness3: reader.readKeyedFloat32(0xBACCC688),
    lipOpacity: reader.readKeyedFloat32(0x589DDCF4),
  }
}

export function writeFaceInfo(writer: BufferWriter, faceInfo: FaceInfo) {
  writer.writeUint32(0x19)
  writer.writeUint32(0)
  writer.writeKeyedFloat32(0xE87727E2, faceInfo.freckleAmount)
  writer.writeKeyedFloat32(0x9361CB58, faceInfo.freckleOpacity)
  writer.writeKeyedFloat32(0x554AD20F, faceInfo.sunSpotsAmount)
  writer.writeKeyedFloat32(0xCFC41264, faceInfo.sunSpotOpacity)
  writer.writeKeyedFloat32(0xB95883B0, faceInfo.eyeMetallic1)
  writer.writeKeyedFloat32(0x9CF750C3, faceInfo.eyeMetallic2)
  writer.writeKeyedFloat32(0xA90644DF, faceInfo.eyeMetallic3)
  writer.writeKeyedFloat32(0xC871A987, faceInfo.eyeSmoothness1)
  writer.writeKeyedFloat32(0xEDDE7AF4, faceInfo.eyeSmoothness2)
  writer.writeKeyedFloat32(0xD82F6EE8, faceInfo.eyeSmoothness3)
  writer.writeKeyedFloat32(0xCAE526BA, faceInfo.eyeOpacity)
  writer.writeKeyedFloat32(0x0526ED02, faceInfo.cheekMetallic1)
  writer.writeKeyedFloat32(0x20893E71, faceInfo.cheekMetallic2)
  writer.writeKeyedFloat32(0x15782A6D, faceInfo.cheekMetallic3)
  writer.writeKeyedFloat32(0x9BE3D5D7, faceInfo.cheekSmoothness1)
  writer.writeKeyedFloat32(0xBE4C06A4, faceInfo.cheekSmoothness2)
  writer.writeKeyedFloat32(0x8BBD12B8, faceInfo.cheekSmoothness3)
  writer.writeKeyedFloat32(0x11A1A1D3, faceInfo.cheekOpacity)
  writer.writeKeyedFloat32(0x92571AC3, faceInfo.lipMetallic1)
  writer.writeKeyedFloat32(0xB7F8C9B0, faceInfo.lipMetallic2)
  writer.writeKeyedFloat32(0x8209DDAC, faceInfo.lipMetallic3)
  writer.writeKeyedFloat32(0xAA9201E7, faceInfo.lipSmoothness1)
  writer.writeKeyedFloat32(0x8F3DD294, faceInfo.lipSmoothness2)
  writer.writeKeyedFloat32(0xBACCC688, faceInfo.lipSmoothness3)
  writer.writeKeyedFloat32(0x589DDCF4, faceInfo.lipOpacity)
}
