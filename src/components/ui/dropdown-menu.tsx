"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { FiCheck, FiChevronRight } from "react-icons/fi";

/* ---------------------------
   Style primitives
---------------------------- */

const itemBase =
  "relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm select-none outline-hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const itemFocus =
  "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground";

const itemDisabled =
  "data-disabled:pointer-events-none data-disabled:opacity-50";

const itemInset = "data-inset:pl-9.5";

const itemDestructiveBase = "data-[variant=destructive]:text-destructive";

const itemDestructiveFocus =
  "data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20";

const itemDestructiveIcon =
  "data-[variant=destructive]:*:[svg]:text-destructive";

const itemDestructive = cn(
  itemDestructiveBase,
  itemDestructiveFocus,
  itemDestructiveIcon,
);

/* ---------------------------
   Root
---------------------------- */

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>,
) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

/* ---------------------------
   Content
---------------------------- */

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height)",
          "w-(--radix-dropdown-menu-trigger-width) min-w-48",
          "origin-(--radix-dropdown-menu-content-transform-origin)",
          "overflow-x-hidden overflow-y-auto",
          "rounded-2xl bg-popover p-1 text-popover-foreground",
          "shadow-2xl ring-1 ring-foreground/5 dark:ring-foreground/10",
          "duration-100",

          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",

          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",

          "data-[state=closed]:overflow-hidden",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/* ---------------------------
   Group
---------------------------- */

function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

/* ---------------------------
   Item
---------------------------- */

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        itemBase,
        itemFocus,
        itemDisabled,
        inset && itemInset,
        itemDestructive,
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------
   Checkbox Item
---------------------------- */

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      checked={checked}
      className={cn(
        itemBase,
        itemFocus,
        itemDisabled,
        inset && itemInset,
        "pr-8 pl-3",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <FiCheck />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/* ---------------------------
   Radio Item
---------------------------- */

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        itemBase,
        itemFocus,
        itemDisabled,
        inset && itemInset,
        "pr-8 pl-3",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <FiCheck />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/* ---------------------------
   Label
---------------------------- */

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2.5 text-xs text-muted-foreground",
        inset && itemInset,
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------
   Separator
---------------------------- */

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}

/* ---------------------------
   Shortcut
---------------------------- */

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        "group-focus/dropdown-menu-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------
   Submenu
---------------------------- */

function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        itemBase,
        itemFocus,
        inset && itemInset,
        "data-open:bg-accent data-open:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <FiChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/* ---------------------------
   Sub Content
---------------------------- */

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-36 origin-(--radix-dropdown-menu-content-transform-origin)",
        "overflow-hidden rounded-2xl bg-popover p-1",
        "text-popover-foreground shadow-2xl",
        "ring-1 ring-foreground/5",
        "duration-100",

        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",

        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",

        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------
   Export
---------------------------- */

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
