interface AppHeaderDesktopProps {
  pathArray: Array<PathObject>
}

interface AppHeaderMobileProps extends AppHeaderDesktopProps {}

interface MobileMenuProps extends AppHeaderDesktopProps {}

interface MobileMenuLinkProps {
  pathObject: PathObject
  closeModal: () => void
  isLastItem: boolean
}

interface PathObject {
  path: string
  text: string
  shouldBeExactPath?: boolean
}