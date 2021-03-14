interface DoubleBoxProps {
  leftPane: JSX.Element
  rightPane: JSX.Element
  titles?: DoubleBoxTitlesProps
}

interface DoubleBoxTitlesProps {
  leftPaneTitle: string
  rightPaneTitle: string
}

interface MobileDoubleBoxTitleProps {
  paneTitle: string
}