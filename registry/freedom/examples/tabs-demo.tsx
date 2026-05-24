import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/elevenlabs-ui/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-muted-foreground text-sm">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="text-muted-foreground text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}
