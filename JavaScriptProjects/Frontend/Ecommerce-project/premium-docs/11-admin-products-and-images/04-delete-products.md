# Delete Products From Admin Area

Now let's add the delete functionality. We need an action to delete the product. Let's open the `lib/actions/product.action.ts` file and add the following:

```ts
// Delete Product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

We check to see if the product exists and if it does, we delete it and revalidate the path. This will update the products page after the product has been deleted.

We already created a component at `components/shared/delete-dialog.tsx` that we can use to delete the product. Let's import it and use it in the page.

Go into `app/admin/products/page.tsx` and import both the delete dialog and the action:

```tsx
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
import DeleteDialog from '@/components/shared/delete-dialog';
```

Noe replace the comment with the actual delete dialog. Right under the edit button, add the following:

```tsx
<DeleteDialog id={product.id} action={deleteProduct} />
```

Now when you click the delete button, it will open the dialog and ask you to confirm that you want to delete the product. If you click yes, it will delete the product and revalidate the path.
