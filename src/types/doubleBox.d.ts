interface DoubleBoxProps {
  leftPane: JSX.Element
  rightPane: JSX.Element
  titles?: DoubleBoxTitlesProps
  isFancy?: boolean
}

interface DoubleBoxTitlesProps {
  leftPaneTitle: string
  rightPaneTitle: string
}

interface MobileDoubleBoxTitleProps {
  paneTitle: string
}