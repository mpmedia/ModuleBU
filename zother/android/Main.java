package com.example.pp;

import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;

public class Main extends Activity {

protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	initFragment(new PaneFrag());
}

/**
 * boilerplate:
 */
protected void initFragment(Fragment fragment) {
	FragmentManager fragmentManager = getFragmentManager();
	FragmentTransaction fragmentTransaction = fragmentManager
			.beginTransaction();
	fragmentTransaction.replace(android.R.id.content, fragment);
	fragmentTransaction.commit();
}

}
