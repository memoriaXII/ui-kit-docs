"use client"

import { Button } from "@/registry/ui/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/ui/drawer"

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Confirm purchase</DrawerTitle>
          <DrawerDescription>
            You are about to redeem 1,200 points for a $12 voucher.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Confirm</Button>
          <Button variant="ghost">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
