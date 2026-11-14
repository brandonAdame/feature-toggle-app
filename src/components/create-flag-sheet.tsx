import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function CreateFlag() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      name: "",
      key: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      toast.success(`${value.name} created successfully`)
      setOpen(false)
    },
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button size="sm">
            <PlusIcon />
            Create flag
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create feature flag</SheetTitle>
          <SheetDescription>
            Add the basic details for a new feature flag.
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <FieldGroup className="p-6">
            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : "Enter a name for this flag.",
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={!field.state.meta.isValid}
                    placeholder="New checkout experience"
                  />
                  <FieldError
                    errors={field.state.meta.errors.map((message) => ({
                      message,
                    }))}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="key"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : "Enter a key for this flag.",
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Key</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={!field.state.meta.isValid}
                    placeholder="new-checkout-experience"
                  />
                  <FieldDescription>
                    Use a unique key to reference this flag in your code.
                  </FieldDescription>
                  <FieldError
                    errors={field.state.meta.errors.map((message) => ({
                      message,
                    }))}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="What does this flag control?"
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <SheetFooter className="mt-auto border-t">
            <Button type="submit" className="w-full">
              Save flag
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
