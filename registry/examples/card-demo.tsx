import { Button } from "@/registry/ui/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Boxo Pass</CardTitle>
        <CardDescription>Loyalty points balance</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Refresh
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">12,480 pts</div>
        <p className="text-muted-foreground text-sm">~ $124.80 USD</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Redeem</Button>
      </CardFooter>
    </Card>
  )
}
