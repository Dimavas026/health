export interface IProduct {
  id: string
  name: string
  macroNutrPercentage: string
  macroNutrDistrib: MacroNutrDistrib
}

interface MacroNutrDistrib {
  proteins: number
  fats: number
  carbohydrates: number
}
