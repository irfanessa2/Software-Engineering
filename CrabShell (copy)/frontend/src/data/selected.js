import { entity } from 'simpler-state';

export const selectedEntity = entity(-1)

export const setSelected = (value) => {
  selectedEntity.set(value)
}