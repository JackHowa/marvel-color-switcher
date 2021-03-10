import { useForm } from "react-hook-form";
import { useAppDispatch } from './App';
import { SUPER_HERO_OPTIONS } from './constants'

function ThemeToggler() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm();

  const onSubmit = data => dispatch({
    type: 'UPDATE_SUPER_HERO',
    id: data.theme
  })

  // should not update each change of pick
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="theme">Super hero theme</label>
      <select id="theme" {...register("theme")}>
        {SUPER_HERO_OPTIONS.map(({ id, headline }) => {
          return (
            <option key={id} value={id}>{headline}</option>
          )
        })}
      </select>
      <input type="submit" />
    </form>
  )
}

export default ThemeToggler;