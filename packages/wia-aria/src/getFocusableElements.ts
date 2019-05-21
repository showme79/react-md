import { TAB_FOCUSABLE, PROGRAMATICALLY_FOCUSABLE } from "./constants";

/**
 * A simple util that will find all the tab focusable elements within a container element.
 * The container should normally be a specific HTMLElement, but it can also be the entire
 * document if you want to find **all** focusable elements within your page.
 *
 * @param container The container element/document to find focusable elements within.
 * @param programatic Boolean if programatically focusable elements should be included
 * instead of only tab focusable.
 * @return A list of HTMLElements that are focusable within the container.
 */
export default function getFocusableElements(
  container: HTMLElement | Document,
  programatic: boolean = false
) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      programatic ? PROGRAMATICALLY_FOCUSABLE : TAB_FOCUSABLE
    )
  );
}
