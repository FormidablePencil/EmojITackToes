import { RESET_ANIMATION_SETTING, SET_ANIMATION_SETTING } from "../actions/types"

const initialState = {

}

export enum Animations {
  bounce = 'bounce',
  rotate = 'rotate',
  swing = 'swing',
  rubber_band = 'rubberBand',
  bounce_in = 'bounceIn',
  bounce_in_down = 'bounceInDown',
  bounce_in_up = 'bounceInUp',
  bounce_in_left = 'bounceInLeft',
  fade_in = 'fadeIn',
  fade_in_down = 'fadeInDown',
  fadeIn_down_big = 'fadeInDownBig',
  fade_in_up = 'fadeInUp',
  fade_in_up_big = 'fadeInUpBig',
  fade_in_left = 'fadeInLeft',
  zoom_in = 'zoomIn',
  zoom_in_down = 'zoomInDown',
  pulse = 'pulse'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_ANIMATION_SETTING:
      return payload

    case RESET_ANIMATION_SETTING:
      return initialState

    default:
      return state
  }
}
