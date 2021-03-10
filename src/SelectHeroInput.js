import { useFormContext } from 'react-hook-form';
import { SUPER_HERO_OPTIONS } from './constants'

function SelectHeroInput() {
  const { register } = useFormContext();

  return (
    <>
      <label htmlFor="theme">Super hero theme</label>
      <select id="theme" {...register("theme")}>
        {SUPER_HERO_OPTIONS.map(({ id, headline }) => {
          return (
            <option key={id} value={id}>{headline}</option>
          )
        })}
      </select>
    </>
  )
}

export default SelectHeroInput;

