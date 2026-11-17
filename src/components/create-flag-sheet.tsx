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
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/reui/number-field"

const environments = [
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "sandbox", label: "Sandbox" },
] as const

type Environment = (typeof environments)[number]["value"]

export function CreateFlag() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      name: "",
      key: "",
      description: "",
      environment: "production" as Environment,
      rollout: 25,
      enabled: false,
    },
    onSubmit: ({ value }) => {
      toast.success(
        `${value.name} created for ${value.environment} with ${value.rollout}% rollout`
      )
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
      <SheetContent className="min-h-0">
        <SheetHeader>
          <SheetTitle>Create feature flag</SheetTitle>
          <SheetDescription>
            Define the flag and choose how it rolls out.
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            <FieldGroup className="p-6">
              <FieldSet>
                <FieldLegend>Flag details</FieldLegend>
                <FieldGroup>
                  <form.Field
                    name="name"
                    validators={{
                      onSubmit: ({ value }) =>
                        value.trim()
                          ? undefined
                          : "Enter a name for this flag.",
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
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          }
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
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          }
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
                        <FieldLabel htmlFor={field.name}>
                          Description
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="What does this flag control?"
                        />
                      </Field>
                    )}
                  </form.Field>
                </FieldGroup>
              </FieldSet>

              <form.Field name="environment">
                {(field) => (
                  <FieldSet>
                    <FieldLegend>Environment</FieldLegend>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => {
                        const environment = environments.find(
                          (option) => option.value === value
                        )
                        if (environment) {
                          field.handleChange(environment.value)
                        }
                      }}
                      className="grid grid-cols-3 gap-2"
                    >
                      {environments.map((environment) => (
                        <FieldLabel
                          key={environment.value}
                          htmlFor={`${field.name}-${environment.value}`}
                          className="flex-1 cursor-pointer items-center justify-center rounded-md border p-2 text-center transition-colors has-[[data-checked]]:border-primary has-[[data-checked]]:bg-muted"
                        >
                          <RadioGroupItem
                            id={`${field.name}-${environment.value}`}
                            value={environment.value}
                          />
                          {environment.label}
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                  </FieldSet>
                )}
              </form.Field>

              <FieldSet>
                <FieldLegend>Rollout</FieldLegend>
                <form.Field name="rollout">
                  {(field) => (
                    <Field>
                      <NumberField
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) =>
                          field.handleChange(value ?? 0)
                        }
                      >
                        <NumberFieldScrubArea label="Initial rollout" />
                        <NumberFieldGroup
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          }
                        >
                          <NumberFieldDecrement aria-label="Decrease rollout" />
                          <NumberFieldInput aria-label="Initial rollout percentage" />
                          <NumberFieldIncrement aria-label="Increase rollout" />
                        </NumberFieldGroup>
                      </NumberField>
                      <FieldDescription>
                        Percentage of users who will receive this flag.
                      </FieldDescription>
                    </Field>
                  )}
                </form.Field>
              </FieldSet>

              <form.Field name="enabled">
                {(field) => (
                  <Field orientation="horizontal">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Enable immediately
                      </FieldLabel>
                      <FieldDescription>
                        Turn the flag on as soon as it is created.
                      </FieldDescription>
                    </div>
                    <Switch
                      id={field.name}
                      name={field.name}
                      checked={field.state.value}
                      onCheckedChange={field.handleChange}
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </div>

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
